import { useContext } from 'react';
import { ProviderDetailContext } from '../../components/ProviderDetail';

export default function useProviderContext() {
  const context = useContext(ProviderDetailContext);
  if (!context) {
    throw new Error('useProviderContext must be used within a providerDetailContext');
  }
  return context;
}