// import React from "react";

// type TableProps = {
//   headers: string[];
//   rows: (string | number | React.ReactNode)[][];
// };

// export default function Table({ headers, rows }: TableProps) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border border-gray-200 rounded">
//         <thead className="bg-gray-100">
//           <tr>
//             {headers.map((h, i) => (
//               <th
//                 key={i}
//                 className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
//               >
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rows.length === 0 ? (
//             <tr>
//               <td
//                 colSpan={headers.length}
//                 className="px-4 py-4 text-center text-gray-500"
//               >
//                 No data available
//               </td>
//             </tr>
//           ) : (
//             rows.map((row, i) => (
//               <tr
//                 key={i}
//                 className="hover:bg-gray-50 transition-colors"
//               >
//                 {row.map((cell, j) => (
//                   <td
//                     key={j}
//                     className="px-4 py-2 text-sm border-b"
//                   >
//                     {cell}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
export default function Table({ headers, rows }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="min-w-full">
        <thead className="sticky top-0 bg-gray-100 backdrop-blur">
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-sm font-semibold"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="hover:bg-blue-50 transition"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-sm border-b"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
