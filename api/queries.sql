SELECT
    b.name,
    b.website,
    b.stylesheet,
    GROUP_CONCAT(DISTINCT CONCAT(l.`title`, ':', l.`svg`)) AS logos,
    -- JSON_ARRAY(JSON_OBJECT('title', l.`title`, 'svg', l.`svg`)) AS logos,
    GROUP_CONCAT(DISTINCT o.origin) AS origin,
    -- JSON_ARRAYAGG(o.origin) as origin,
    GROUP_CONCAT(DISTINCT g.genre) AS genre
    -- JSON_ARRAYAGG(g.genre) as genre
FROM
    bands b
LEFT JOIN bands_origins bo ON
    bo.band_id = b.band_id
LEFT JOIN origins o ON
    o.origin_id = bo.origin_id
LEFT JOIN bands_genres bg ON
    bg.band_id = b.band_id
LEFT JOIN genres g ON
    g.genre_id = bg.genre_id
LEFT JOIN logos l ON
    b.band_id = l.band_id
GROUP BY
    b.band_id


-- Result
-- {
--XXX   "name": "14 Bis",
--XXX   "css": "14-bis.css",
--XXX   "origin": ["Brazil"],
--   "genre": ["MPB"],
--XXX   "link": "http://14bis.com.br",
--   "logos": [
--     {
--       "title": "Ao vivo",
--       "svg": "14-bis_ao-vivo.svg"
--     }
--   ]
-- }
