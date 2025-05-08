import React from 'react'
import { Text } from '@/components/Text/Text'
import { Box } from '../Box/Box'
import { Button } from '../Button/Button'
import { routeSections } from '@/app/framtal/routeSections'
import { useRouter } from 'next/navigation'
import { Divider } from '../Divider/Divider'
import { useTaxContext } from '../Utils/context/taxContext'
import {
  BenefitInput,
  SalaryInput,
  DeductionInput,
  OtherDebt,
  Attachment,
} from '@/generated/graphql'
import { SalaryEntries } from './Launagreidslur'
import { Benefits } from './StyrkirOgHlunnindi'
import { Fasteignir, Okutaeki } from './Eignir'
import { Mortgages } from './Ibudalan'
import { OtherDebts } from './AdrarSkuldir'
import { TopicCard } from '../TopicCard/TopicCard'
import { Stack } from '../Stack/Stack'
import { AlertMessage } from '../AlertMessage/AlertMessage'
import { formatPhoneNr } from '../Utils/utils'
import { DeductionEntries } from './Fradrattur'
import LoadingDots from '../LoadingDots/LoadingDots'
import { StaticIcon } from '../IconRC/StaticIcon'
import { EmptyTable } from '../EmptyTable/EmptyTable'

const InfoSectionHeader = ({
  title,
  onEdit,
  children,
  showDivider,
}: {
  title: string
  onEdit: () => void
  showDivider?: boolean
  children?: React.ReactNode
}) => {
  return (
    <Box>
      <Box display="flex" justifyContent="spaceBetween" alignItems="center">
        <Text variant="h4" fontWeight="semiBold">
          {title}
        </Text>
        <Button onClick={onEdit} variant="ghost" size="small">
          <Box display="flex" columnGap={1} alignItems="center">
            <Text variant="eyebrow">Breyta</Text>
            <StaticIcon icon="pencil" color="#0061ff" size="small" />
          </Box>
        </Button>
      </Box>
      <Box marginTop={4} marginBottom={3}>
        {children}
      </Box>
      {showDivider ? <Divider /> : null}
    </Box>
  )
}

const Personuupplysingar = ({
  name,
  address,
  email,
  phoneNumber,
}: {
  name?: string
  address?: string
  email?: string
  phoneNumber?: string
}) => (
  <Box display="flex" flexDirection="column" rowGap={3}>
    <Box>
      <Text variant="h5" fontWeight="semiBold">
        {name}
      </Text>
      <Text variant="default">Lögheimili: {address}</Text>
    </Box>
    <Box
      display="flex"
      flexWrap="wrap"
      columnGap={3}
      rowGap={2}
      alignItems="flexStart"
    >
      <Box display="flex" flexDirection="column" rowGap={1} width="half">
        <Text variant="eyebrow">Netfang</Text>
        <Text variant="default">{email}</Text>
      </Box>
      <Box display="flex" flexDirection="column" rowGap={1} flexShrink={0}>
        <Text variant="eyebrow">Símanúmer</Text>
        <Text variant="default">{formatPhoneNr(phoneNumber)}</Text>
      </Box>
    </Box>
  </Box>
)

const Bankareikningur = ({ bankAccount }: { bankAccount?: string }) => (
  <Box display="flex" flexDirection="column" rowGap={1}>
    <Text variant="eyebrow">Bankareikningur</Text>
    <Text>{bankAccount}</Text>
  </Box>
)

const Slysatrygging = ({
  hasAccidentInsurance,
}: {
  hasAccidentInsurance?: boolean
}) => (
  <Box display="flex" flexDirection="column" rowGap={1}>
    <Text variant="eyebrow">
      Ég óska eftir slysatryggingu vegna heimilisstarfa
    </Text>
    <Text>{hasAccidentInsurance ? 'Já' : 'Nei'}</Text>
  </Box>
)

const Launagreidslur = ({
  salaryEntries,
}: {
  salaryEntries: SalaryInput[]
}) => {
  return <SalaryEntries salaryEntries={salaryEntries} />
}

const StyrkirOgHlunnindi = ({ benefits }: { benefits: BenefitInput[] }) => {
  return <Benefits benefits={benefits} />
}

const Fradrattur = ({ deductions }: { deductions: DeductionInput[] }) => {
  return <DeductionEntries deductions={deductions} />
}

const Eignir = () => {
  return (
    <Box display="flex" flexDirection="column" rowGap={3}>
      <Box>
        <Text variant="eyebrow" marginBottom={2}>
          Fasteignir
        </Text>
        <Fasteignir />
      </Box>
      <Box>
        <Text variant="eyebrow" marginBottom={2}>
          Ökutæki
        </Text>
        <Okutaeki />
      </Box>
    </Box>
  )
}
const Ibudalan = () => {
  return <Mortgages />
}
const AdrarSkuldir = ({ otherDebts }: { otherDebts: OtherDebt[] }) => {
  return <OtherDebts otherDebts={otherDebts} />
}
const Fylgiskjol = ({ attachments }: { attachments: Attachment[] }) => {
  if (attachments.length === 0) {
    return <EmptyTable message="Engin fylgiskjöl í framtali" />
  }
  return (
    <Stack space={2}>
      {attachments.map((a, index) => (
        <TopicCard key={`${a.name}-${index}`} colorScheme="blue" tag={'PDF'}>
          {a.name ?? ''}
        </TopicCard>
      ))}
    </Stack>
  )
}

const Samantekt = () => {
  const router = useRouter()
  const { taxReturn } = useTaxContext()

  const handleClick = (href: string) => {
    router.push(`${href}`)
  }

  const items: { name: string; href: string }[] = []

  routeSections.forEach((section) => {
    if (section.showInSummary && section.href) {
      items.push({ name: section.name, href: section.href })
    }

    section.children?.forEach((child) => {
      if (child.showInSummary && child.href) {
        items.push({ name: child.name, href: child.href })
      }
    })
  })

  const sectionContentMap: Record<string, React.ReactNode> = {
    personuupplysingar: (
      <Personuupplysingar
        name={taxReturn?.name ?? ''}
        address={taxReturn?.address ?? ''}
        email={taxReturn?.email ?? ''}
        phoneNumber={taxReturn?.phoneNumber ?? ''}
      />
    ),
    bankareikningur: (
      <Bankareikningur
        bankAccount={`${taxReturn?.bankAccount?.substring(0, 4) ?? ''}-${taxReturn?.bankAccount?.substring(4, 6) ?? ' '}-${taxReturn?.bankAccount?.substring(6) ?? ''}`}
      />
    ),
    slysatrygging: (
      <Slysatrygging hasAccidentInsurance={!!taxReturn?.hasAccidentInsurance} />
    ),
    launagreidslur: (
      <Launagreidslur salaryEntries={taxReturn?.salaries ?? []} />
    ),
    'styrkir-og-hlunnindi': (
      <StyrkirOgHlunnindi benefits={taxReturn?.benefits ?? []} />
    ),
    fradrattur: <Fradrattur deductions={taxReturn?.deductions ?? []} />,
    eignir: <Eignir />,
    ibudalan: <Ibudalan />,
    'adrar-skuldir': <AdrarSkuldir otherDebts={taxReturn?.otherDebts ?? []} />,
    fylgiskjol: <Fylgiskjol attachments={taxReturn?.attachments ?? []} />,
  }

  return (
    <div>
      <Text marginBottom={6}>
        Hér eru samtölur byggðar á því sem þú taldir fram. Ef allar upplýsingar
        eru réttar geturðu skilað inn framtalinu.
      </Text>
      <Box display="flex" flexDirection="column" rowGap={6}>
        {taxReturn ? (
          <>
            {items.map((item, index) => (
              <InfoSectionHeader
                key={item.href}
                title={item.name}
                onEdit={() => handleClick(item.href)}
                showDivider={index < items.length - 1}
              >
                {sectionContentMap[item.href] || null}
              </InfoSectionHeader>
            ))}
            <AlertMessage
              type="success"
              title="Framtalið stóðst prófun"
              message="Engar villur fundust í framtalinu. Þú getur skilað því inn ef þú telur allar upplýsingar hér að ofan vera réttar."
            />
          </>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ height: '377px' }}
          >
            <LoadingDots />
          </Box>
        )}
      </Box>
    </div>
  )
}

export default Samantekt
