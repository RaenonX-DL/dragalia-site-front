import React, {CSSProperties} from 'react';

import {DepotPaths} from '../../../../api-def/resources';
import {useI18n} from '../../../../i18n/hook';
import {Image} from '../../common/image';
import {InternalLink} from '../../common/link/internal';
import {Loading} from '../../common/loading';
import {ModalMappedContent} from '../../common/modal/mapped';
import {UnitLinkModal, UnitLinkModalProps} from './modal/main';
import {UnitLinkModalState} from './modal/types';


type UnitLinkProps = Pick<UnitLinkModalProps, 'unit' | 'hasAnalysis'> & {
  className?: string,
  style?: CSSProperties,
};

export const UnitLink = ({unit, className, style, hasAnalysis = true}: UnitLinkProps) => {
  // DON'T use `useUnitInfo` hook here because it will fetch many times upon initial load,
  // which severely impacts performance.
  const {t} = useI18n();

  const [modalState, setModalState] = React.useState<UnitLinkModalState>({
    show: false,
    title: t((t) => t.game.unitInfo.text.relatedLinks),
    key: 'content',
  });

  const onLinkClicked = () => setModalState({...modalState, show: true});

  // Empty string as the class name to ensure the link is rendered using its default style
  // Reboot CSS disables link styling if the <a> tag has no `href` and no `class`
  return (
    <>
      <ModalMappedContent
        state={modalState}
        setState={setModalState}
        lookup={{
          content: <UnitLinkModal unit={unit} hasAnalysis={hasAnalysis}/>,
          loading: <Loading/>,
        }}
      />
      {
        unit.icon &&
        <Image
          text="" src={DepotPaths.getUnitIconURL(unit.icon.type, unit.icon.name)}
          className="unit-icon"
        />
      }
      <InternalLink
        className={className || ''}
        style={style}
        onClick={onLinkClicked}
        content={unit.name}
      />
    </>
  );
};
