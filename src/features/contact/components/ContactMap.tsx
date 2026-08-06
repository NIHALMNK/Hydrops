import { ExternalLink, MapPin } from 'lucide-react';
import type { ContactMapData } from '../types';
import { getMapEmbedUrl } from '../lib/maps';

interface Props {
  data: ContactMapData;
}

export function ContactMap({ data }: Props) {
  const embedUrl = getMapEmbedUrl(data.googleMapsUrl, data.mapEmbedUrl);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12">
      <div className="relative w-full h-[450px] sm:h-[500px] rounded-[2.5rem] overflow-hidden border border-[#E8E5DF] shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-[#FAF8F5]">
        {/* Live Google Map iframe */}
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Hydrops Google Map Location"
          className="w-full h-full filter grayscale-[0.25] contrast-[1.05]"
        />

        {/* Floating location info pill on map */}
        <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-md border border-[#E8E5DF] p-5 rounded-2xl shadow-lg flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#205C3B]/10 text-[#205C3B] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1A1A1A]">Hydrops Headquarters</p>
              <p className="text-xs font-light text-[#737373]">Ernakulam, Kerala, India</p>
            </div>
          </div>

          {data.googleMapsUrl && (
            <a
              href={data.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#205C3B] text-[#1A1A1A] hover:text-white transition-colors flex-shrink-0"
              aria-label="Open in Google Maps"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
