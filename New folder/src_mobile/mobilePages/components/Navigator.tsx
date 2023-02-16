import React from 'react'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';

const Navigator = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  
    const activeBorder = history.location.pathname.split('/')[2];
  
    return (
      <>
        <div className="flex justify-between px-4 py-2 mx-4 ">
          <span onClick={() => history.push(`${path}/dashboard`)} className={activeBorder === 'dashboard' ? 'border-b-4' : ''}>
            DashBoard
          </span>
          <span onClick={() => history.push(`${path}/screener`)} className={activeBorder === 'screener' ? 'border-b-4' : ''}>
            Screener
          </span>
          {path === "/future" &&
            (<span
              onClick={() => history.push(`${path}/heatmap`)}
              className={activeBorder === 'heatmap' ? 'border-b-4' : ''}>
            HeatMap
            </span>)}
          {path === "/option" &&
            (<span
              onClick={() => history.push(`${path}/screener/:type`)}
              className={activeBorder === 'screener' ? 'border-b-4' : ''}>
                Option Chain
            </span>)}
          
        </div>
        <div className="border-b-2 -mt-2 mx-4"></div>
      </>
    );
}

export default Navigator