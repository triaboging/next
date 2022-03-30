import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router'
interface ConfirmationPageProps  {

}

 const ConfirmationPage:React.FC<ConfirmationPageProps> = ({}) => {
    const router = useRouter()
    setTimeout(()=>{
        router.push('/')
    },2000)
    return (
    <Container maxWidth="md"  
    sx={{
        flex: "1 1 auto",
        outline: '1px solid red'
        }}>
            <Box mt={5} sx={{textAlign: 'center'}}>
               <h1>аккаунт подтвержден</h1>
                    
            </Box>
        
       
     
    </Container>
    
)};

export default ConfirmationPage;
