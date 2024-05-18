import React from 'react';
import icon96kbps from './iconedebit1.png'; // Remplacez par le chemin correct de votre icône

    const Icon96kbps = ({ altText, size = 2,width, height, ...rest }) => {
      const styles = {
        width: `${size}em`,
        height: `${size}em`,
      };
      return (
        <img src={icon96kbps} alt={altText} style={styles} width={width} height={height} {...rest} />
      );
    };
export default Icon96kbps;
