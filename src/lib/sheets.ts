import { JWT } from 'google-auth-library'
import { GoogleSpreadsheet } from 'google-spreadsheet'

import { env } from '@env'

const serviceAccountAuth = new JWT({
	email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
	key: env.GOOGLE_PRIVATE_KEY,
	scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

export function getDoc(id: string) {
	return new GoogleSpreadsheet(id, serviceAccountAuth)
}
