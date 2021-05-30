import { readdirSync, statSync } from 'fs';
import { resolve as pathResolve } from 'path';

const listDirs = (path) => readdirSync(path).filter((file) => statSync(pathResolve(path, file)).isDirectory());
const listFiles = (path) => readdirSync(path).filter((file) => !statSync(pathResolve(path, file)).isDirectory());

const localesDirPath = pathResolve(__dirname, '..', 'public', 'locales');

const languages = listDirs(localesDirPath).filter((language) => language !== 'en');

describe('i18n', () => {
  let enComponents;

  beforeAll(() => {
    enComponents = listFiles(pathResolve(localesDirPath, 'en'));
  });

  describe('Languages should have same components as en', () => {
    test.each(languages)('%s should have same components as en', (language) => {
      const languageComponents = listFiles(pathResolve(localesDirPath, language));

      enComponents.forEach((enComponent) => {
        expect(languageComponents).toContain(enComponent);
      });
    });
  });

  describe('All components should have same keys', () => {
    test.each(languages)('%s should have same translation keys as en', (language) => {
      enComponents.forEach((componentFileName) => {
        const enTranslation = require(pathResolve(pathResolve(localesDirPath, 'en', componentFileName)));
        const translation = require(pathResolve(pathResolve(localesDirPath, language, componentFileName)));

        const enKeys = Object.keys(enTranslation).sort();
        const translationKeys = Object.keys(translation).sort();

        expect(translationKeys).toEqual(enKeys);
      });
    });
  });
});
