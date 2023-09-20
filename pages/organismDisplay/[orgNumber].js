import OrganismDisplay from '../../components/OrganismDisplay';
import { useRouter } from 'next/router';

////////////////////////////////////////////////////////////////////////////////

function OrganismDisplayPage() {

    const router = useRouter();
    const { orgNumber } = router.query;
    
////////////////////////////////////////////////////////////////////////////////
 
    return (
      <div>
        <div><OrganismDisplay orgNumber={orgNumber} /></div>
      </div>
    );
  };
  
  export default OrganismDisplayPage;
  
