import React, { Component } from 'react';
import {StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 600,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default styles;