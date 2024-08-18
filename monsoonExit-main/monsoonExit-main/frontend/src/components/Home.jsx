import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then((res) => {
                setRows(res.data);
            })
            .catch((error) => {
                console.log('error:', error);
            });
    }, []);

    function del_Value(id) {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => {
                alert('Data deleted');
                setRows(rows.filter(row => row._id !== id)); // Update state to reflect deletion
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function update_Value(val) {
        navigate('/add', { state: { val } });
    }

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom component="div" sx={{ fontWeight: 'bold', color: '#6a1b9a', textAlign: 'center', marginBottom: '30px' }}>
                BlogApp
            </Typography>
            <Grid container spacing={3}>
                {rows.map((row, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ minWidth: 275, boxShadow: 3 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14, color: '#6a1b9a' }} gutterBottom>
                                    {row.title}
                                </Typography>
                                <img src={row.img_url} alt={row.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                                    {row.content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="secondary" onClick={() => update_Value(row)}>
                                    Update
                                </Button>
                                <Button variant="contained" color="error" onClick={() => del_Value(row._id)}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Home;
