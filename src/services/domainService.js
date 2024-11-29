import whois from 'whois-json';
import { parseISO, format } from 'date-fns';
import { fr } from 'date-fns/locale/index.js';
import { extractExpiryDate } from '../utils/dateUtils.js';

const SUPPORTED_EXTENSIONS = ['.fr', '.com', '.net', '.org', '.it', '.de', '.co.uk'];

export async function checkDomain(domain) {
  // Vérifier si l'extension est supportée
  const extension = '.' + domain.split('.').pop();
  if (!SUPPORTED_EXTENSIONS.includes(extension)) {
    throw new Error(`Extension non supportée. Extensions disponibles: ${SUPPORTED_EXTENSIONS.join(', ')}`);
  }

  try {
    const whoisData = await whois(domain);
    
    if (!whoisData) {
      return {
        domain,
        available: true,
        message: 'Le domaine est disponible'
      };
    }

    const expiryDate = extractExpiryDate(whoisData);
    
    if (!expiryDate) {
      return {
        domain,
        available: false,
        message: 'Le domaine est enregistré mais la date d\'expiration n\'est pas disponible'
      };
    }

    const formattedDate = format(parseISO(expiryDate), 'dd MMMM yyyy', { locale: fr });

    return {
      domain,
      available: false,
      expiryDate: formattedDate,
      message: `Le domaine n'est pas disponible. Date d'expiration: ${formattedDate}`
    };
  } catch (error) {
    throw new Error(`Erreur lors de la vérification du domaine: ${error.message}`);
  }
}