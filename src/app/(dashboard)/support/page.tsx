'use client';

import { MessageCircle, Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useApi } from '@/lib/swr';
import { useSWRConfig } from 'swr';

const initialMessages = [
  {
    id: 1,
    author: 'Support',
    body: 'Hi Ava, we noticed payout delays in EMEA. Want help reviewing the queue?',
    time: '09:18',
    incoming: true,
  },
  {
    id: 2,
    author: 'Ava Morgan',
    body: 'Yes please. We have a big cohort renewal today.',
    time: '09:20',
    incoming: false,
  },
  {
    id: 3,
    author: 'Support',
    body: 'Great. I am escalating the payout batch and monitoring retries.',
    time: '09:22',
    incoming: true,
  },
];

export default function SupportPage() {
  const { mutate } = useSWRConfig();
  const { data: threadsData } = useApi<
    | { items?: Array<{ id?: string; title?: string; status?: string }> }
    | Array<{ id?: string; title?: string; status?: string }>
    | null
  >('/support/threads', { fallbackData: null });

  const threads = Array.isArray(threadsData) ? threadsData : threadsData?.items ?? [];
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  const activeId = activeThreadId ?? threads[0]?.id ?? null;
  const threadDetailPath = activeId ? `/support/threads/${activeId}` : null;
  const { data: threadDetail } = useApi<{ messages?: typeof initialMessages } | null>(
    threadDetailPath,
    { fallbackData: null }
  );

  const messages = useMemo(() => {
    if (threadDetail?.messages && threadDetail.messages.length) {
      return threadDetail.messages;
    }
    return initialMessages;
  }, [threadDetail]);

  const [draft, setDraft] = useState('');

  const handleSend = async () => {
    if (!draft.trim()) {
      return;
    }
    const payload = {
      content: draft.trim(),
      senderType: 'admin',
    };

    if (activeId) {
      await apiFetch(`/support/threads/${activeId}/messages`, {
        method: 'POST',
        body: payload,
      });
      await mutate(threadDetailPath);
    }

    setDraft('');
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <header>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Support</p>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Customer chat</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Stay aligned with high-touch customer conversations.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-slate-500 dark:text-slate-300" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {threads[0]?.title ?? 'Ava Morgan'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {threads[0]?.status ?? 'Enterprise - Renewal pending'}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.incoming ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    message.incoming
                      ? 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  <p className="text-xs font-semibold opacity-70">{message.author}</p>
                  <p className="mt-1">{message.body}</p>
                  <p className="mt-2 text-right text-[10px] opacity-60">{message.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Write a reply..."
              className="flex-1 bg-transparent text-sm text-slate-700 outline-none dark:text-slate-200"
            />
            <button
              type="button"
              onClick={handleSend}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
            >
              Send
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Active threads</p>
            <div className="mt-3 space-y-2">
              {(threads.length ? threads : [{ id: 'demo', title: 'Ava Morgan', status: 'Open' }]).map(
                (thread) => (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => setActiveThreadId(thread.id ?? null)}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${
                      activeId === thread.id
                        ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{thread.title ?? 'Untitled'}</span>
                    <span className="text-[10px] opacity-70">{thread.status ?? 'Open'}</span>
                  </button>
                )
              )}
            </div>
          </div>
          {[
            {
              title: 'Open requests',
              value: '12',
              detail: '3 high priority',
            },
            {
              title: 'Avg. response time',
              value: '42 min',
              detail: 'Down 18% this week',
            },
            {
              title: 'CSAT score',
              value: '4.8/5',
              detail: 'Top 10% of fintech teams',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.title}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{card.value}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{card.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
