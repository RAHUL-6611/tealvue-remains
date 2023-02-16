import Layout from "../../components/Layout"
import Equity from "../../components/Equity"
const Dashboard = () => {
  return (
    <Layout>
        <div className="w-full p-0 m-0 ">
          <div className="grid sm:grid-cols-2 grid-cols-1">

            <div className="indices">Indices</div>
            <div className="orders-holding">Orders / Holding</div>
            {/* <div className="indices">Orders</div> */}
            <div className="equity-summary">
              <Equity/>
            </div>
            <div className="derivatives">Derivatives</div>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard