import React from 'react';
import icon320kbps from './iconedebit3.png'; // Remplacez par le chemin correct de votre icône

    const Icon320kbps = ({ altText, size = 2,width, height, ...rest }) => {
      const styles = {
        width: `${size}em`,
        height: `${size}em`,
      };
      return (
        <img src={icon320kbps} alt={altText} style={styles} width={width} height={height} {...rest} />
      );
    };
export default Icon320kbps;
