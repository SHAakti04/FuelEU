// type KPIProps = {
//   label: string;
//   value: number | string;
// };

// export default function KPI({ label, value }: KPIProps) {
//   const isPositive =
//     typeof value === "number" ? value >= 0 : true;

//   return (
//     <div
//       className={`p-4 rounded shadow text-center ${
//         isPositive ? "bg-green-50" : "bg-red-50"
//       }`}
//     >
//       <p className="text-sm text-gray-500">{label}</p>
//       <p
//         className={`text-xl font-bold ${
//           isPositive ? "text-green-700" : "text-red-700"
//         }`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }
type KPIProps = {
  label: string;
  value: number | string;
};

export default function KPI({ label, value }: KPIProps) {
  const positive = typeof value === "number" ? value >= 0 : true;

  return (
    <div
      className={`kpi-card ${
        positive ? "bg-green-50" : "bg-red-50"
      } animate-scale-in`}
    >
      <p className="text-sm opacity-70">{label}</p>
      <h3
        className={`text-2xl font-bold ${
          positive ? "text-green-700" : "text-red-700"
        }`}
      >
        {value}
      </h3>
    </div>
  );
}
