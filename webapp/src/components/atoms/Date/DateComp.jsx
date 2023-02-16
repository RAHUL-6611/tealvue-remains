import { RiArrowDownSLine } from 'react-icons/ri';
import { IoSettings } from 'react-icons/io5';

function DateComp({ value }) {
  return (
    <div className="flex relative justify-evenly items-center border-slate-300 border-2 border-solid mx-3 rounded md:px-2 px-0 bg-white">
      {value === 0 ? (
        <div className="flex md:mx-3 px-1 items-center">
          <div className="mx-3 hidden md:block pl-5">
            <div>Expire date</div>
            <input type="date" name="expiry" id="expiry" className="inputdate" />
          </div>
          <label htmlFor="expiry">
            <div className="text-2xl text-gray-400 mx-1 hidden md:block">
              <RiArrowDownSLine />
            </div>
          </label>
        </div>
      ) : (
        <div className="text-2xl text-gray-400 mx-1 ">
          <IoSettings />
        </div>
      )}
    </div>
  );
}

export default DateComp;
