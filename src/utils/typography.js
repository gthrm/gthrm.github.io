import Typography from 'typography';
import altonTheme from 'typography-theme-ocean-beach';
import './global.css';

altonTheme.overrideStyles = () => ({
  a: {
    color: 'var(--textLink)',
  },
  // gatsby-remark-autolink-headers - don't underline when hidden
  'a.anchor': {
    boxShadow: 'none',
  },
  h1: {
    color: 'var(--textNormal)',
  },
  h2: {
    color: 'var(--textNormal)',
  },
  h3: {
    color: 'var(--textNormal)',
  },
  code: {
    backgroundColor: 'var(--codeBg)',
    color: 'var(--codeText)',
    padding: '10px 15px',
    borderRadius: '3px',
  },
  // gatsby-remark-autolink-headers - use theme colours for the link icon
  'a.anchor svg[aria-hidden="true"]': {
    stroke: 'var(--textLink)',
  },
  'a h3': {
    color: 'var(--textLink)',
  },
  hr: {
    background: 'var(--hr)',
  },
});

const typography = new Typography(altonTheme);

export default typography;
export const { rhythm } = typography;
