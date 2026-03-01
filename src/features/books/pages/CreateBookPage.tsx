
import { PageTitle, PageWrapper } from '@/shared/components'
import { useLocalize } from '@/shared/lib'

import { BookForm } from '../form'

export default function CreateBookPage() {

    const { t } = useLocalize("book")

    return (
        <PageWrapper>
            <PageTitle withBackArrow title={t("titles.createBook")} />

            <BookForm />
        </PageWrapper>
    )
}
