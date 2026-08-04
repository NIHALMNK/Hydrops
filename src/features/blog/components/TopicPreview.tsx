import type { TopicPreviewData } from '@/features/blog/types';

interface Props {
  data: TopicPreviewData;
}

export function TopicPreview({ data }: Props) {
  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-16 pb-24">
      <div className="border-t border-black/10 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.topics.map((topic, i) => (
            <div 
              key={i}
              className="topic-card flex flex-col p-8 rounded-2xl bg-white/40 border border-black/5 hover:bg-white/60 transition-colors duration-500"
            >
              <h3 
                className="text-xl font-light mb-8"
                style={{ color: 'rgba(30,30,30,0.85)' }}
              >
                {topic.title}
              </h3>
              <div 
                className="mt-auto self-start text-[10px] tracking-widest uppercase"
                style={{ color: 'rgba(30,30,30,0.4)' }}
              >
                Coming Soon
              </div>
            </div>
          ))}
        </div>

        <p 
          className="blog-bottom-caption mt-16 text-[1.1rem] leading-relaxed max-w-2xl text-center mx-auto"
          style={{ color: 'rgba(30,30,30,0.55)' }}
        >
          More stories are being carefully prepared.<br/>Stay tuned.
        </p>
      </div>
    </section>
  );
}
