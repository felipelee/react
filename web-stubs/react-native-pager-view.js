// Web stub for react-native-pager-view
import React from 'react';
import { View, ScrollView } from 'react-native';

// Minimal PagerView implementation for web
export default class PagerView extends React.Component {
  render() {
    const { children, style } = this.props;
    return (
      <ScrollView 
        horizontal 
        pagingEnabled 
        style={style}
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }
}

export const PagerViewNativeComponent = PagerView;
