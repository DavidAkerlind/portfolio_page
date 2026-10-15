import { projects } from '../data/projects';
import {
	intro,
	education,
	experience,
	earlierWork,
	skills,
} from '../data/about';
import { marathon, alsoInto, studyTools } from '../data/outside';
import { sv } from './sv';

// The site's content in English (the files in src/data) with the Swedish text laid
// over it. Only text is translated: images, links, ids and dates stay as they are in
// the data files, so the two versions cannot drift apart.
//   - an object is merged key by key,
//   - a list of objects is merged by position, or by `id` when the Swedish side is
//     an object keyed by id,
//   - anything else (a string, a list of strings) is replaced.
function overlay(base, over) {
	if (over === undefined) return base;

	if (Array.isArray(base) && base.every((item) => item && typeof item === 'object')) {
		return base.map((item, index) =>
			overlay(item, Array.isArray(over) ? over[index] : over[item.id]),
		);
	}

	if (base && typeof base === 'object' && !Array.isArray(base)) {
		const result = { ...base };
		for (const [key, value] of Object.entries(over)) {
			result[key] = overlay(base[key], value);
		}
		return result;
	}

	return over;
}

const english = {
	projects,
	intro,
	education,
	experience,
	earlierWork,
	skills,
	marathon,
	alsoInto,
	studyTools,
};

const content = { en: english, sv: overlay(english, sv) };

export const getContent = (lang) => content[lang] ?? content.en;
