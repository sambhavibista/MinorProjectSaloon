import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea ,Box} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function CommonCard({price, title, name,location, date,imageUrl}) {
  return (
    <div style={{marginBottom:'1rem',display:"flex",alignItems:"center",justifyContent:"center"}}>
    <Card>
      <CardActionArea>
      <div style={{position:'relative'}}>
        <Box sx={{display:"flex",gap:"10px"}}>
        <LocationOnIcon className='responsive_fontsize26' sx={{
          position:"absolute",
          top:{xs:"92%",sm:"90%",md:"89%"},
          marginLeft:{xs:'8px',md:"3px"},
          color:"#ffffff"}}/>
          
        <Typography sx={{
          position:"absolute",
          textAlign:'center',
          color:"#FFFFFF",
          marginLeft:"30px",
          bottom:{xs:'1%',md:'2%'}

          }}  variant='body2' color="textSecondary" component="p">{location}</Typography>
          </Box>
        <CardMedia
          component="img"
          image={imageUrl}
          alt="property image"
          sx={{
            height:{xs:"220px",sm:"210px",md:"230px",lg:'280px'},width:{xs:"270px",sm:"270px",md:"320px",lg:'380px'}
          }}
        />
        </div>
        <CardContent>
        <Box sx={{height:{xs:"40px",sm:"60px",md:"70px",lg:"80px"},marginBottom:{xs:'2px',sm:"3px"},margin:'0px 1px'}}>
        <Typography className="responsive_fontsize24" sx={{color:'primary.main'}} gutterBottom variant="h5" component="div">
          {price}
        </Typography>
        <Typography className="responsive_fontsize14" sx={{color:'primary.main'}} variant="body2" color="text.secondary">
         {title}
        </Typography>
        <Box sx={{display:'flex', flexDirection:'row',justifyContent:"space-between"}}>
        <Typography className="responsive_fontsize14" sx={{color:'primary.main'}}variant="body2" color="text.secondary" >
         {name}
        </Typography>
        <Typography className="responsive_fontsize14" sx={{color:'primary.main'}} variant="body2" color="text.secondary">
         {date}
        </Typography>
        </Box>
        </Box>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}
export default CommonCard;