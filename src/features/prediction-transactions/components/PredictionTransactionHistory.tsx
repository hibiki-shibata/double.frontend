// import { PredictionCard } from './PredictionCard';
// import type { Prediction } from '../types';

// interface Props {
//   predictions: Prediction[];
//   currency: string;
//   selectedId?: string;
//   onSelect: (predictionId: string) => void;
// }

// export function PredictionSelector({ predictions, currency, selectedId, onSelect }: Props) {
//   return (
//     <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
//       {predictions.map((prediction) => (
//         <PredictionCard
//           key={prediction.id}
//           prediction={prediction}
//           currency={currency}
//           selected={prediction.id === selectedId}
//           onSelect={onSelect}
//         />
//       ))}
//     </div>
//   );
// }