function DashboardCard({ value, icon, name, iconColor,dashboardTypeClick,activeClass }) {
  return (
    <>
      <div className={`w-[100%] rounded-xl shadow-lg cus1 cursor-pointer ${activeClass} bg-[#F2F2F2]  hover:bg-white`} onClick={dashboardTypeClick} id="dsh-c-title-h">
        <div className="px-8 py-6" id="dsh-title1">
          <div className="font-bold flex text-2xl mb-2">
            <div className={iconColor} id="dsh-title-heading">{icon}</div>
            <div className="flex" id="dsh-title-value">{value}</div>
          </div>
          <div className="text-gray-600 mb-2" id="dsh-title-name"> {name}</div>
        </div>
      </div>
    </>
  );
}
export default DashboardCard;
