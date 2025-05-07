import React from 'react'
import { Text } from '@/components/Text/Text'
import { Box } from '../Box/Box'
import { Icon } from '../IconRC/Icon'
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

const InfoSectionHeader = ({
  title,
  onEdit,
  children,
}: {
  title: string
  onEdit: () => void
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
            <Icon icon="pencil" color="blue400" size="small" />
          </Box>
        </Button>
      </Box>
      <Box marginTop={4} marginBottom={3}>
        {children}
      </Box>
      <Divider />
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
      <Text variant="default">Lögheimili: {address} </Text>
    </Box>
    <Box display="flex" justifyContent="spaceBetween">
      <Box display="flex" flexDirection="column" rowGap={1}>
        <Text variant="eyebrow">Netfang</Text>
        <Text variant="default">{email}</Text>
      </Box>
      <Box display="flex" flexDirection="column" rowGap={1}>
        <Text variant="eyebrow">Símanúmer</Text>
        <Text variant="default">{phoneNumber}</Text>
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
    <Text fontWeight="regular">{hasAccidentInsurance ? 'Já' : 'Nei'}</Text>
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
  console.log('Fradrattur', deductions)
  return (
    <Box>
      <Text variant="eyebrow">TODO</Text>
    </Box>
  )
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
        {items.map((item) => (
          <InfoSectionHeader
            key={item.href}
            title={item.name}
            onEdit={() => handleClick(item.href)}
          >
            {sectionContentMap[item.href] || null}
          </InfoSectionHeader>
        ))}
      </Box>
    </div>
  )
}

export default Samantekt
