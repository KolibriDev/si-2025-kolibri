export interface RouteSection {
  name: string
  href?: string
  isActive?: boolean
  pageHeader?: string
  showInSummary?: boolean
  children: {
    pageHeader?: string
    showInSummary?: boolean
    name: string
    href: string
    isActive?: boolean
    onClick?: () => void
  }[]
}

export function findPageHeaderByStep(step: string): string | undefined {
  for (const section of routeSections) {
    if (section.href === step) {
      return section.pageHeader ?? section.name
    }

    for (const child of section.children) {
      if (child.href === step) {
        return child.pageHeader ?? child.name
      }
    }
  }

  return undefined
}

export function getFlatRouteSteps(): string[] {
  const steps: string[] = []

  for (const section of routeSections) {
    if (section.href) {
      steps.push(section.href)
    }
    for (const child of section.children) {
      if (child.href) {
        steps.push(child.href)
      }
    }
  }

  return steps
}

export function getNextStep(currentStep: string): string | undefined {
  const steps = getFlatRouteSteps()
  const index = steps.indexOf(currentStep)

  if (index !== -1 && index + 1 < steps.length) {
    return steps[index + 1]
  }

  return undefined
}

export function getPreviousStep(currentStep: string): string | undefined {
  const steps = getFlatRouteSteps()
  const index = steps.indexOf(currentStep)

  if (index > 0) {
    return steps[index - 1]
  }

  return undefined
}

export const routeSections: RouteSection[] = [
  {
    name: 'Forsendur',
    children: [
      {
        name: 'Upplýsingar',
        href: 'upplysingar',
        pageHeader: 'Þú ert að fara að skila skattframtali',
      },
      { name: 'Gagnaöflun', href: 'gagnaoflun' },
    ],
  },
  {
    name: 'Mínar upplýsingar',
    children: [
      {
        name: 'Persónuupplýsingar',
        href: 'personuupplysingar',
        showInSummary: true,
      },
      {
        name: 'Bankareikningur',
        href: 'bankareikningur',
        showInSummary: true,
      },
      {
        name: 'Slysatrygging',
        href: 'slysatrygging',
        pageHeader: 'Slysatrygging vegna heimilisstarfa',
        showInSummary: true,
      },
    ],
  },
  {
    name: 'Tekjur',
    children: [
      {
        name: 'Launagreiðslur',
        href: 'launagreidslur',
        showInSummary: true,
      },
      {
        name: 'Styrkir og hlunnindi',
        href: 'styrkir-og-hlunnindi',
        showInSummary: true,
      },
      {
        name: 'Lífeyrir og bótagreiðslur',
        href: 'lifeyrir-og-botagreidslur',
      },
      {
        name: 'Frádráttur',
        href: 'fradrattur',
        showInSummary: true,
      },
      {
        name: 'Aðrar tekjur',
        href: 'adrar-tekjur',
      },
    ],
  },
  {
    name: 'Eignir',
    href: 'eignir',
    children: [],
    showInSummary: true,
  },
  {
    name: 'Skuldir',
    children: [
      {
        name: 'Íbúðalán',
        href: 'ibudalan',
        showInSummary: true,
      },
      {
        name: 'Aðrar skuldir',
        href: 'adrar-skuldir',
        showInSummary: true,
      },
    ],
  },
  {
    name: 'Fylgiskjöl',
    href: 'fylgiskjol',
    children: [],
    showInSummary: true,
  },
  {
    name: 'Samantekt',
    href: 'samantekt',
    children: [],
  },
  {
    name: 'Staðfesting',
    href: 'stadfesting',
    children: [],
  },
]
