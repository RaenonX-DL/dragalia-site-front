import React, {CSSProperties} from 'react';

import Button from 'react-bootstrap/Button';

import {UnitType} from '../../../../api-def/api';
import {DepotPaths} from '../../../../api-def/resources';
import {PostPath, UnitPath} from '../../../../const/path/definitions';
import {useI18n} from '../../../../i18n/hook';
import {makePostUrl, makeUnitUrl} from '../../../../utils/path/make';
import {Image} from '../../common/image';
import {Loading} from '../../common/loading';
import {CommonModal, ModalState} from '../../common/modal';


type UnitInfo = {
  id: number,
  name: string,
  icon?: {
    type: UnitType,
    name: string,
  },
}

type ModalContentProps = {
  unit: UnitInfo,
  hasAnalysis?: boolean,
  modalState: ModalState,
  setModalState: (newState: ModalState) => void,
}

const ModalContent = ({unit, hasAnalysis, modalState, setModalState}: ModalContentProps) => {
  const {t, lang} = useI18n();

  const onLinkClicked = () => {
    setModalState({...modalState, show: true, message: <Loading/>});
  };

  return (
    <div className="text-center">
      {
        hasAnalysis &&
        <Button variant="link">
          <a href={makePostUrl(PostPath.ANALYSIS, {pid: unit.id, lang})} onClick={onLinkClicked}>
            {t((t) => t.game.unitInfo.links.analysis)}
          </a>
        </Button>
      }
      <Button variant="link">
        <a href={makeUnitUrl(UnitPath.UNIT_INFO, {id: unit.id, lang})} onClick={onLinkClicked}>
          {t((t) => t.game.unitInfo.links.info)}
        </a>
      </Button>
    </div>
  );
};

type UnitLinkProps = Pick<ModalContentProps, 'unit' | 'hasAnalysis'> & {
  className?: string,
  style?: CSSProperties,
}

export const UnitLink = ({unit, className, style, hasAnalysis = true}: UnitLinkProps) => {
  // DON'T use `useUnitInfo` hook because it will fetch many times upon initial load,
  // which severely impacts performance.
  const {t} = useI18n();

  const [modalState, setModalState] = React.useState<ModalState>({
    show: false,
    title: t((t) => t.game.unitInfo.text.relatedLinks),
    message: '',
  });

  const onLinkClicked = () => setModalState({
    ...modalState,
    show: true,
    message: (
      <ModalContent
        unit={unit} hasAnalysis={hasAnalysis}
        modalState={modalState} setModalState={setModalState}
      />
    ),
  });

  // Empty string as the class name to ensure the link is rendered using its default style
  // Reboot CSS disables link styling if the <a> tag has no `href` and no `class`
  return (
    <>
      <CommonModal modalState={modalState} setModalState={setModalState} clearContentOnClose={false}/>
      {
        unit.icon &&
        <Image
          text="" src={DepotPaths.getUnitIconURL(unit.icon.type, unit.icon.name)}
          className="unitIcon"
        />
      }
      <a className={className || ''} style={style} onClick={onLinkClicked}>
        {unit.name}
      </a>
    </>
  );
};
