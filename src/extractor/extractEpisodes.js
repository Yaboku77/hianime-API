import { load } from 'cheerio';

export const extractEpisodes = (html) => {
  const $ = load(html);

  // Extract the main Anime Title (similar to your detail page logic)
  const animeTitle = $('.anis-content .anisc-detail .film-name').text().trim();
  const animeAltTitle = $('.anis-content .anisc-detail .film-name').attr('data-jname');

  const episodes = [];

  $('.ssl-item.ep-item').each((i, el) => {
    const obj = {
      title: null,
      alternativeTitle: null,
      id: null,
      isFiller: false,
      episodeNumber: null,
    };

    obj.episodeNumber = i + 1;
    obj.title = $(el).attr('title');
    
    // Safety check for href to prevent errors if attribute is missing
    const href = $(el).attr('href');
    obj.id = href ? href.replace('/watch/', '').replace('?', '::') : null;
    
    obj.isFiller = $(el).hasClass('ssl-item-filler');
    obj.alternativeTitle = $(el).find('.ep-name.e-dynamic-name').attr('data-jname');

    episodes.push(obj);
  });

  // Return an object containing both the Anime metadata and the episodes list
  return {
    animeTitle,
    animeAltTitle,
    totalEpisodes: episodes.length,
    episodes
  };
};
