import { Footer } from 'components';
import Slide from './Slide';
import Services from './Services';
import NewsBlog from './NewsBlog';

export default function LandingPage() {
  return (
    <div>
      <Slide />
      <Services />
      <NewsBlog />
      <Footer />
    </div>
  );
}
