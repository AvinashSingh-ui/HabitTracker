import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { fetchHabits } from '../store/habitSlice';
import { LinearProgress, Paper, Typography } from '@mui/material';

const HabitStats = () => {

    const { habits, isLoading, error } = useSelector((state: RootState) => state.habits);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchHabits());
    }, [])

    if(isLoading){
        return <LinearProgress/>
    }
    if(error){
        return <Typography color="error">{error}</Typography>
    }
    const getCompletedToday=()=>{
        const today=new Date().toISOString().split("T")[0];
        return habits.filter((habit)=>habit.completedDates.includes(today)).length;
    }
    const getStreak = (habit: (typeof habits)[number]): number=>{
        let streak = 0;
        const currentDate=new Date();
        while(true){
            const today=currentDate.toISOString().split("T")[0];
            if(habit.completedDates.includes(today)){
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            }
            else{
                break;
            }
        }
    
        return streak;
       }
       const getLongestStreak=()=>{
        return Math.max(...habits.map(getStreak),0);
       }

    return (
       <Paper elevation={2} sx={{p:2,mt:4}}>
        <Typography variant='h6' gutterBottom>
            Habit Statistics
        </Typography>
        <Typography variant="body1">
        Total Habits:{habits.length}
        </Typography>
        <Typography  variant="body1">
        Completed Today:{getCompletedToday()}
        </Typography>
        <Typography variant="body1">
        Longest Streak:{getLongestStreak()}
        </Typography>
       </Paper>
    )
}

export default HabitStats
