import { Card, Overlay, Button, Text } from '@mantine/core';
import classes from './banner.module.css';

export function Banner({title, description, imageUrl, backgroundPosition}) {
  return (
    <Card radius="md" className={classes.card} style={{backgroundImage: `url("${imageUrl}")`, backgroundPosition: backgroundPosition}}>
      <Overlay className={classes.overlay} opacity={0.8} zIndex={0} />

      <div className={classes.content}>
        <h1 fw={700} style={{color: '#fff'}} >
          {title}
        </h1>

        <Text size="md" className={classes.description}>
          {description}
        </Text>

      </div>
    </Card>
  );
}