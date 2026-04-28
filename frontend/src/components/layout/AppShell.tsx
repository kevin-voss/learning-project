import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react'

import { TopicNav } from '@/components/layout/TopicNav'
import { TopicSidebarChrome } from '@/components/layout/TopicSidebarChrome'
import { LearnPanel } from '@/components/learn/LearnPanel'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { curriculum } from '@/data/curriculum'
import { loadTopicRailOpen, saveTopicRailOpen } from '@/hooks/codestepSettings'
import type { Topic } from '@/types/curriculum'

import styles from './AppShell.module.css'

const WIDE_LAYOUT_MEDIA_QUERY = '(min-width: 56.25rem)'

function useWideLayout() {
  const [wide, setWide] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(WIDE_LAYOUT_MEDIA_QUERY).matches
      : true,
  )

  useEffect(() => {
    const mq = window.matchMedia(WIDE_LAYOUT_MEDIA_QUERY)
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return wide
}

type Props = {
  selectedTopic: Topic
  onTopicIdChange: (id: string) => void
  lessonStepIdx: number
  onLessonStepIdxChange: Dispatch<SetStateAction<number>>
  navigateTopicOverview: (topicId: string) => void
  navigateLearnStep: (topicId: string, stepIndex: number) => void
}

export function AppShell({
  selectedTopic,
  onTopicIdChange,
  lessonStepIdx,
  onLessonStepIdxChange,
  navigateTopicOverview,
  navigateLearnStep,
}: Props) {
  const wideLayout = useWideLayout()
  const [topicRailOpen, setTopicRailOpen] = useState(() => loadTopicRailOpen())
  const [mobileTopicSheetOpen, setMobileTopicSheetOpen] = useState(false)

  useEffect(() => {
    saveTopicRailOpen(topicRailOpen)
  }, [topicRailOpen])

  useEffect(() => {
    if (wideLayout) setMobileTopicSheetOpen(false)
  }, [wideLayout])

  const bodyClass =
    wideLayout && !topicRailOpen
      ? `${styles.body} ${styles.bodyTopicRailCollapsed}`
      : styles.body

  const nextTopic = useMemo(() => {
    const i = curriculum.findIndex((t) => t.id === selectedTopic.id)
    if (i < 0 || i >= curriculum.length - 1) return null
    const t = curriculum[i + 1]!
    return { id: t.id, title: t.title }
  }, [selectedTopic.id])

  const showTopicsTrigger =
    (!wideLayout && !mobileTopicSheetOpen) || (wideLayout && !topicRailOpen)
  const topicsMenuOpen = wideLayout ? topicRailOpen : mobileTopicSheetOpen

  const openTopicsMenu = () => {
    if (wideLayout) setTopicRailOpen(true)
    else setMobileTopicSheetOpen(true)
  }

  return (
    <div className={styles.viewport}>
      <div className="bg-orbs" aria-hidden />
      <div className={styles.frame}>
        <div className={bodyClass}>
          {wideLayout && topicRailOpen ? (
            <aside
              id="topic-rail"
              className={styles.topicRail}
              aria-label="Course navigation"
            >
              <TopicSidebarChrome onCollapseRail={() => setTopicRailOpen(false)} />
              <TopicNav
                topics={curriculum}
                selectedId={selectedTopic.id}
                learnStepIdxForSelected={lessonStepIdx}
                navigateTopicOverview={navigateTopicOverview}
                navigateLearnStep={navigateLearnStep}
              />
            </aside>
          ) : null}
          <main className={styles.main}>
            <LearnPanel
              key={selectedTopic.id}
              topic={selectedTopic}
              lessonStepIdx={lessonStepIdx}
              onLessonStepIdxChange={onLessonStepIdxChange}
              nextTopic={nextTopic}
              onAdvanceToTopicId={onTopicIdChange}
              showTopicsTrigger={showTopicsTrigger}
              onOpenTopics={openTopicsMenu}
              topicsMenuOpen={topicsMenuOpen}
              topicsControlsId={wideLayout ? 'topic-rail' : 'topic-sheet'}
              topicCatalog={curriculum.map((t) => ({
                id: t.id,
                title: t.title,
              }))}
              onJumpToEarlierTopic={navigateTopicOverview}
            />
          </main>
        </div>
      </div>

      <Sheet open={mobileTopicSheetOpen} onOpenChange={setMobileTopicSheetOpen}>
        <SheetContent
          id="topic-sheet"
          side="left"
          showCloseButton
          className="w-[min(22rem,calc(100vw-2rem))] border-[var(--color-border)] bg-[rgb(15_23_41/97%)] p-0 text-[var(--color-fg)] shadow-xl backdrop-blur-xl sm:max-w-[22rem]"
        >
          <SheetHeader className="border-b border-[var(--color-border)] px-5 pb-4 pt-5 pr-12">
            <SheetTitle className="font-[family-name:var(--font-ui)] text-[var(--color-fg)]">
              Course navigation
            </SheetTitle>
            <SheetDescription className="text-[var(--color-fg-muted)]">
              Expand a topic for every lesson step—teal is overview, blue is walkthrough, orange is
              hands-on practice.
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-5 pt-3">
            <TopicNav
              topics={curriculum}
              selectedId={selectedTopic.id}
              learnStepIdxForSelected={lessonStepIdx}
              navigateTopicOverview={navigateTopicOverview}
              navigateLearnStep={navigateLearnStep}
              layout="stack"
              showSectionLabel
              onAfterNavigate={() => setMobileTopicSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
