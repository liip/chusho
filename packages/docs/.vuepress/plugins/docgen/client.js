import _ from 'lodash';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export default ({ Vue }) => {
  Vue.filter('md', function(value) {
    if (!value) return '';
    return md.render(value);
  });
};
