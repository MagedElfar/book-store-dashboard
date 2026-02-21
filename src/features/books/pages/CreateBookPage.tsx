import { useTranslation } from 'react-i18next'

import { PageTitle, PageWrapper } from '@/shared/components'

import { BookForm } from '../form'

export default function CreateBookPage() {

    const { t } = useTranslation("book")

    return (
        <PageWrapper>
            <PageTitle withBackArrow title={t("titles.createBook")} />

            <BookForm />
        </PageWrapper>
    )
}
