import Link from 'next/link';
import Image from 'next/image';
import type { BlogAuthor, BlogCategory, BlogTag } from '@/features/blog/types';

interface Props {
  author: BlogAuthor;
  category: BlogCategory;
  tags: BlogTag[];
  publishDate: string;
}

export function ArticleFooterMeta({ author, category, tags, publishDate }: Props) {
  const formattedDate = publishDate
    ? new Date(publishDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <footer className="my-16 pt-10 border-t border-neutral-200/80 space-y-12">
      {/* Category & Tags section */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Category Pill */}
        {category?.title && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Category:
            </span>
            <Link
              href={`/blog?category=${category.slug}`}
              className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 hover:bg-neutral-200 transition-colors"
            >
              {category.icon ? `${category.icon} ` : ''}
              {category.title}
            </Link>
          </div>
        )}

        {/* Tags Pills */}
        {tags && tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Tags:
            </span>
            {tags.map((tag) => (
              <span
                key={tag.id || tag.slug}
                className="px-3 py-0.5 rounded-full text-xs font-medium bg-neutral-50 text-neutral-600 border border-neutral-200"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Author Bio Card */}
      <div className="p-8 md:p-10 rounded-3xl bg-neutral-100/80 border border-neutral-200/80 flex flex-col md:flex-row items-start gap-6">
        {/* Avatar */}
        {author.avatar?.src ? (
          <Image
            src={author.avatar.src}
            alt={author.name}
            width={72}
            height={72}
            className="rounded-full object-cover border border-neutral-300 shrink-0"
          />
        ) : (
          <div className="w-18 h-18 rounded-full bg-amber-500/10 text-amber-700 font-bold flex items-center justify-center text-xl border border-amber-500/20 shrink-0">
            {author.name.charAt(0)}
          </div>
        )}

        {/* Author Bio Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div>
              <h4 className="text-lg font-semibold text-neutral-900">{author.name}</h4>
              <p className="text-xs text-amber-700 font-medium">{author.designation}</p>
            </div>

            {/* Experience badge */}
            {author.experience && (
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white text-neutral-600 border border-neutral-200">
                {author.experience}
              </span>
            )}
          </div>

          <p className="text-neutral-600 text-sm leading-relaxed mb-4">
            {author.bio || author.shortBio || `${author.name} contributes to the Hydrops Journal.`}
          </p>

          {/* Social / External Links */}
          <div className="flex items-center gap-4 text-xs font-medium">
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 hover:text-amber-800 underline underline-offset-2"
              >
                LinkedIn Profile ↗
              </a>
            )}
            {author.website && (
              <a
                href={author.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 hover:text-amber-800 underline underline-offset-2"
              >
                Website ↗
              </a>
            )}
            {formattedDate && (
              <span className="text-neutral-400 ml-auto text-[11px]">
                Published {formattedDate}
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
