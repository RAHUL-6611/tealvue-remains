import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';

import { Loader } from 'components';
import { commonObject, customAxiosError, dashboardGraphProps } from 'interfaces';
import { useAppSelector } from '../../../redux/hooks';

interface customProps extends dashboardGraphProps {
  screenType: string;
}

export default function ScreenerTable({ expiryOption, screenType }: customProps) {
  const [loading, setLoading] = useState(true);
  const activeScreener = useAppSelector((state) => state.requestType.screenerSelection);
  const [data, setData] = useState<any>();

  const getData = async (expiry_at: string, active: string, start: number, end: number) => {
    setLoading(true);

    try {
      const payload: commonObject = {
        screener_type: activeScreener.value,
        type: screenType,
        range: {
          start,
          end,
        },
      };

      if (expiry_at) payload.expiry_at = expiry_at;

      const { data } = await axios.post('v1/api/overview/screener', payload);
      setData(data.tableData);

      return {
        data: data.tableData ?? ([] as any[]),
        count: data.count,
      };
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    } finally {
      setLoading(false);
    }
  };
  const memoizedGetData = useCallback(getData, [activeScreener.value, screenType, setData]);

  useEffect(() => {
    if (expiryOption.value && activeScreener.value) {
      const dataForTable = async () => {
        const res = await memoizedGetData(expiryOption.value, activeScreener.value, 0, 100);
        console.log(res?.data);
        setData(res?.data);
      };
      dataForTable();
    }
  }, [memoizedGetData, expiryOption.value, setData, activeScreener.value]);

  return (
    <>
      <div className="w-full max-h-screen overflow-scroll no-scrollbar">
        {loading && <Loader />}

        {data && <Table tableData={data} option="" />}
      </div>
    </>
  );
}
