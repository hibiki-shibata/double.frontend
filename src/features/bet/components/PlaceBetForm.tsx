// import { useState } from 'react';
// import { PredictionSelector } from '../../prediction/components/PredictionSelector';
// import type { Prediction } from '../../prediction/types';
// import type { PlaceBetInput } from '../types';

// interface Props {
//   predictions: Prediction[];
//   currency: string;
//   isSubmitting?: boolean;
//   onSubmit: (input: PlaceBetInput) => void;
// }

// export function PlaceBetForm({ predictions, currency, isSubmitting, onSubmit }: Props) {
//   const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
//   const [amountInput, setAmountInput] = useState('');

//   const parsedAmount = Number(amountInput);
//   const canSubmit =
//     Boolean(selectedId) && amountInput.trim() !== '' && Number.isFinite(parsedAmount) && parsedAmount > 0;

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!selectedId || !canSubmit) return;
//     // Convert display units -> minor units here once currency decimals are wired in;
//     // for now this assumes a 2-decimal currency for the example.
//     const minorUnits = Math.round(parsedAmount * 100).toString();
//     onSubmit({ predictionId: selectedId, amount: minorUnits });
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-3">
//       <PredictionSelector
//         predictions={predictions}
//         currency={currency}
//         selectedId={selectedId}
//         onSelect={setSelectedId}
//       />
//       <div>
//         <label htmlFor="bet-amount" className="block text-xs font-medium text-slate-600">
//           Amount ({currency})
//         </label>
//         <input
//           id="bet-amount"
//           type="number"
//           min="0"
//           step="0.01"
//           value={amountInput}
//           onChange={(e) => setAmountInput(e.target.value)}
//           className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
//           placeholder="0.00"
//         />
//       </div>
//       <button
//         type="submit"
//         disabled={!canSubmit || isSubmitting}
//         className="w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white disabled:opacity-50"
//       >
//         {isSubmitting ? 'Placing bet…' : 'Place bet'}
//       </button>
//     </form>
//   );
// }