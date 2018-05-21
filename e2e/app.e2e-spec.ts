import { HeroloPage } from './app.po';

describe('herolo App', () => {
  let page: HeroloPage;

  beforeEach(() => {
    page = new HeroloPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
