import { useEffect, useState } from 'react';
import { Calendar, Image, Newspaper } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Event, MediaCoverage, BlogPost } from '../lib/supabase';

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [mediaCoverage, setMediaCoverage] = useState<MediaCoverage[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [eventsRes, mediaRes, blogsRes] = await Promise.all([
        supabase.from('events').select('*').order('event_date', { ascending: false }),
        supabase.from('media_coverage').select('*').order('published_date', { ascending: false }),
        supabase.from('blog_posts').select('*').order('published_at', { ascending: false }),
      ]);

      if (eventsRes.data) {
        const now = new Date();
        const upcoming = eventsRes.data.filter((e) => new Date(e.event_date) >= now);
        const past = eventsRes.data.filter((e) => new Date(e.event_date) < now);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      }

      if (mediaRes.data) setMediaCoverage(mediaRes.data);
      if (blogsRes.data) setBlogPosts(blogsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Events & Media</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Stay updated with our latest events, media coverage, and success stories
          </p>
        </div>
      </section>

      {isLoading ? (
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
        </div>
      ) : (
        <>
          {upcomingEvents.length > 0 && (
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-8">Upcoming Events</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-xl shadow-md p-6 border-t-4 border-orange-500">
                      <div className="flex items-center space-x-2 text-orange-500 mb-3">
                        <Calendar size={20} />
                        <span className="text-sm font-semibold">
                          {new Date(event.event_date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      {event.description && <p className="text-gray-600 text-sm mb-3">{event.description}</p>}
                      {event.location && (
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Location:</span> {event.location}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {mediaCoverage.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-8">Media Coverage</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mediaCoverage.map((media) => (
                    <a
                      key={media.id}
                      href={media.article_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <Newspaper className="text-blue-900" size={24} />
                        <span className="font-bold text-gray-900">{media.publication_name}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{media.title}</h3>
                      {media.published_date && (
                        <p className="text-sm text-gray-500">
                          {new Date(media.published_date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {blogPosts.length > 0 && (
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-8">Success Stories & Updates</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                      <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <Image size={48} className="text-blue-900 opacity-50" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                        {post.excerpt && <p className="text-gray-600 mb-4">{post.excerpt}</p>}
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          {post.author && <span>By {post.author}</span>}
                          <span>
                            {new Date(post.published_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {pastEvents.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-8">Past Events</h2>
                <div className="space-y-4">
                  {pastEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
                      <Calendar className="text-gray-400 flex-shrink-0" size={24} />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(event.event_date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        {event.description && <p className="text-gray-600 text-sm mt-2">{event.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {upcomingEvents.length === 0 && mediaCoverage.length === 0 && blogPosts.length === 0 && pastEvents.length === 0 && (
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Calendar size={64} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Content will be available soon. Stay tuned!</p>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
