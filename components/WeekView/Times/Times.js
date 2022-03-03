import React from 'react';
import PropTypes from 'prop-types';
import { View, Text ,TouchableOpacity} from 'react-native';
import styles from './Times.styles';
import { getTimeLabelHeight } from '../utils';
import Icon from '../../Icon';
const Times = ({ times, hoursInDisplay, timeStep, textStyle }) => {
  const height = getTimeLabelHeight(hoursInDisplay, timeStep);
  
  return (
    <View style={styles.columnContainer}>
      {times.map((time) => (
        <View key={time.name} style={[styles.label, { height }]}>
          <TouchableOpacity style={styles.RoomName} >
                  
                      {<Text style={{alignSelf:'center',fontWeight:'bold'}}>{time.name} </Text>}
                      <View style={styles.RoomIcon}>
                      
                        <Icon name={"bed"} backgroundColor={'#fff'} iconColor={'#6a5acd'} size={35}/>
                        <Icon name={"human-male-male"} backgroundColor={'#fff'} iconColor={'#6a5acd'} size={30}/>
                      
                     </View>
                  
                </TouchableOpacity>
        </View>
      ))}
      </View>
      // {times.map((time) => (
      //   <View key={time} style={[styles.label, { height }]}>
      //     {<Text style={[styles.text, textStyle]}>{time}</Text>}
      //     <Text style={[styles.text, textStyle]}>Apple</Text>
      //   </View>
      // ))}
    
  );
};

Times.propTypes = {
  times: PropTypes.arrayOf(PropTypes.string).isRequired,
  hoursInDisplay: PropTypes.number.isRequired,
  timeStep: PropTypes.number.isRequired,
  textStyle: Text.propTypes.style,
};




export default React.memo(Times);