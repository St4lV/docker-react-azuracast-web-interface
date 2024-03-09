import React from 'react';
import icon128kbps from './iconedebit2.png'; // Remplacez par le chemin correct de votre icône

    const Icon128kbps = ({ altText, size = 2,width, height, ...rest }) => {
      const styles = {
        width: `${size}em`,
        height: `${size}em`,
      };
      return (
        <img src={icon128kbps} alt={altText} style={styles} width={width} height={height} {...rest} />
      );
    };
export default Icon128kbps;
