// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { userProfileApi } from './api';
// import type { UpdateProfileInput } from './types';

// export const userProfileKeys = {
//   me: ['user-profile', 'me'] as const,
// };

// export function useCurrentUser() {
//   return useQuery({
//     queryKey: userProfileKeys.me,
//     queryFn: userProfileApi.getCurrentUser,
//   });
// }

// export function useUpdateProfile() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (patch: UpdateProfileInput) => userProfileApi.updateProfile(patch),
//     onSuccess: (updated) => {
//       queryClient.setQueryData(userProfileKeys.me, updated);
//     },
//   });
// }