export function extractExpiryDate(whoisData) {
  // Différents champs possibles pour la date d'expiration selon les registrars
  const expiryFields = [
    'registryExpiryDate',
    'expiryDate',
    'expires',
    'paid-till',
    'expire',
    'expiration_date',
    'expiry_date'
  ];

  for (const field of expiryFields) {
    if (whoisData[field]) {
      return whoisData[field];
    }
  }

  return null;
}