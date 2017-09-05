import { TodoWebPage } from './app.po';

describe('todo-web App', () => {
  let page: TodoWebPage;

  beforeEach(() => {
    page = new TodoWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
