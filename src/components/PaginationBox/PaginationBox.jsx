import React, { useEffect } from 'react';
import { formatDateMonth } from '../../utils/format-date';
import { getIcon } from '../../utils';
import Icon from '../Icon';
import Search from './Search';
import styles from './PaginationBox.module.scss';

const PaginationBox = ({ currentPage, totalPage, language, dates }) => {
  const paginationBoxRef = React.createRef();
  const paginationListRef = React.createRef();
  const paginationUlRef = React.createRef();
  const activePageRef = React.createRef();
  const arrowLeft = React.createRef();
  const arrowRight = React.createRef();
  const toolTipRef = React.createRef();

  let scrollId = null;

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (paginationListRef.current) {
        moveActivePageCenter();
        setLinksWidth();
        setDisplayArrows();
        colorArrow();
      }
    });
    moveActivePageCenter();
    setLinksWidth();
    setDisplayArrows();
    colorArrow();
  });

  const getLinksWidth = () => {
    return Math.min(
      paginationUlRef.current.offsetWidth,
      paginationBoxRef.current.offsetWidth - 72
    );
  };

  const moveActivePageCenter = () => {
    let scrollLeft = currentPage * 32 + 16 - getLinksWidth() / 2;
    setTimeout(() => (paginationListRef.current.scrollLeft = scrollLeft), 0);
  };

  const setLinksWidth = () => {
    paginationListRef.current.style.width = getLinksWidth() + 'px';
  };

  const onScroll = arrow => {
    if (paginationListRef.current.scrollLeft === null) {
      return;
    }
    let value = arrow === 'left' ? -2 : 2;
    scrollId = setInterval(
      () => (paginationListRef.current.scrollLeft += value),
      1
    );
  };

  const clearId = () => {
    clearInterval(scrollId);
  };

  const onMouseDown = arrow => {
    onScroll(arrow);
    colorArrow();
  };

  const onMouseUp = () => {
    clearId();
    colorArrow();
  };

  const setDisplayArrows = () => {
    if (
      paginationUlRef.current.offsetWidth <
      paginationBoxRef.current.offsetWidth - 72
    ) {
      arrowLeft.current.style.display = 'none';
      arrowRight.current.style.display = 'none';
    } else {
      arrowLeft.current.style.display = 'block';
      arrowRight.current.style.display = 'block';
    }
  };

  const scrollable = arrow => {
    if (!paginationListRef.current) {
      return null;
    }
    if (arrow === 'left') {
      return paginationListRef.current.scrollLeft !== 0;
    }
    return (
      paginationListRef.current.scrollLeft !==
      paginationUlRef.current.offsetWidth -
        paginationListRef.current.offsetWidth
    );
  };

  const arrowColor = arrow => {
    if (scrollable(arrow)) {
      return '#ea6a47';
    }
    return '#bbbbbb';
  };

  const colorArrow = () => {
    arrowLeft.current.style.color = arrowColor('left');
    arrowRight.current.style.color = arrowColor('right');
  };

  const getLink = index => {
    if (index === 0) {
      return language === 'en' ? '/' : '/ja';
    }
    return `/page/${index}${language === 'en' ? '' : '/ja'}`;
  };

  const displayDate = (i, event) => {
    let clickedLinkCoordsLeft = event.target.getBoundingClientRect().left;
    let bodyCoordsLeft = paginationBoxRef.current.getBoundingClientRect().left;
    toolTipRef.current.style.visibility = 'visible';
    if (typeof dates[i] === 'object') {
      toolTipRef.current.innerHTML = renderDate(dates[i][0]);
    } else {
      toolTipRef.current.innerHTML = renderDate(dates[i]);
    }
    toolTipRef.current.style.left =
      clickedLinkCoordsLeft - bodyCoordsLeft + 'px';
  };

  const removeDate = () => {
    toolTipRef.current.style.visibility = 'hidden';
  };

  const renderToolTip = () => {
    return (
      <div className={styles['pagination-box__body__tooltip-container']}>
        <div
          ref={toolTipRef}
          className={styles['pagination-box__body__tooltip']}
        />
      </div>
    );
  };

  const renderLinkList = () => {
    return (
      <div
        onScroll={colorArrow}
        ref={paginationListRef}
        className={styles['pagination-box__body__links']}
      >
        <ul
          ref={paginationUlRef}
          className={styles['pagination-box__body__links__list']}
        >
          {linkListItems().map(list => list)}
        </ul>
      </div>
    );
  };

  const linkListItems = () => {
    let listItems = [];
    for (let i = 0; i < totalPage; i++) {
      listItems.push(
        <li
          key={i}
          ref={i === currentPage ? activePageRef : null}
          onMouseOver={(event) => displayDate(i, event)}
          onMouseOut={removeDate}
          className={
            styles[
              `pagination-box__body__links__list-item${
                i === currentPage ? '-active' : ''
              }`
            ]
          }
        >
          <a href={getLink(i)}>{i + 1}</a>
        </li>
      );
    }
    return listItems;
  };

  const renderDate = date => {
    return formatDateMonth(date, language);
  };

  const renderLeftArrow = () => {
    return (
      <span
        ref={arrowLeft}
        onMouseDown={() => onMouseDown('left')}
        onMouseUp={onMouseUp}
        className={styles['pagination-box__body-leftarrow']}
      >
        <Icon icon={getIcon('leftarrow')} />
      </span>
    );
  };

  const renderRightArrow = () => {
    return (
      <span
        ref={arrowRight}
        onMouseDown={() => onMouseDown('right')}
        onMouseUp={onMouseUp}
        className={styles['pagination-box__body-rightarrow']}
      >
        <Icon icon={getIcon('rightarrow')} />
      </span>
    );
  };

  return (
    <div ref={paginationBoxRef} className={styles['pagination-box']}>
      {renderToolTip()}
      <div className={styles['pagination-box__body']}>
        {renderLeftArrow()}
        {renderLinkList()}
        {renderRightArrow()}
      </div>
      <Search currentPage={currentPage} dates={dates} language={language} />
    </div>
  );
};

export default PaginationBox;
