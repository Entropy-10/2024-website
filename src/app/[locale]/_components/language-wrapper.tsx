import { getTranslationProgress } from '~/lib/crodwin'
import LanguagePicker from './language-picker'

export default async function LanguageWrapper() {
	const languagesProgress = await getTranslationProgress()

	return <LanguagePicker progress={languagesProgress} />
}
