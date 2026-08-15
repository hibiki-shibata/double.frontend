// import { formatMoney } from '../../../lib/money';
// import type { Prediction } from '../types';

// interface Props {
//   prediction: Prediction;
//   currency: string;
//   onSelect?: (predictionId: string) => void;
//   selected?: boolean;
// }

// export function PredictionCard({ prediction, currency, onSelect, selected }: Props) {
//   const disabled = prediction.status !== 'ACTIVE';

//   return (
//     <button
//       type="button"
//       disabled={disabled}
//       onClick={() => onSelect?.(prediction.id)}
//       className={`w-full rounded-lg border p-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
//         selected ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 hover:bg-slate-50'
//       }`}
//     >
//       <p className="text-sm font-medium">{prediction.label}</p>
//       <p className={`mt-1 text-xs ${selected ? 'text-slate-300' : 'text-slate-500'}`}>
//         Pool: {formatMoney(prediction.totalBetSum, currency)}
//       </p>
//     </button>
//   );
// }