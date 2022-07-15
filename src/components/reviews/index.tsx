import * as React from 'react';
import styles from './reviews.module.css';

interface Props {}

const Reviews: React.FC<Props> = () => {
  const [activeOption, setActiveOption] = React.useState<string>('REVIEWS');

  return (
    <div className={styles.container}>
      <div className={styles.reviewsWrapper}>
        <div className={styles.stars}>
          <h1 className={styles.reviewsHeader}>
            What others think about the product
          </h1>
          <div className={styles.average}>
            <span className={styles.ratingTitle}>
              <svg
                className={styles.mobileStar}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
              </svg>
              <svg
                className={styles.desktopStar}
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
              </svg>
              4.8
            </span>
            <p className={styles.ratingSubTitle}>Average rating</p>
          </div>
        </div>

        <section className={styles.barRatings}>
          <div className={styles.barWrapper}>
            <p>5</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
            </svg>
            <div className={styles.bar}>
              <div className={styles.innerBar}></div>
            </div>
          </div>
          <div className={styles.barWrapper}>
            <p>4</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
            </svg>
            <div className={styles.bar}>
              <div className={styles.innerBar}></div>
            </div>
          </div>
          <div className={styles.barWrapper}>
            <p>3</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
            </svg>
            <div className={styles.bar}>
              <div className={styles.innerBar}></div>
            </div>
          </div>
          <div className={styles.barWrapper}>
            <p>2</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
            </svg>
            <div className={styles.bar}>
              <div className={styles.innerBar}></div>
            </div>
          </div>
          <div className={styles.barWrapper}>
            <p>1</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
            </svg>
            <div className={styles.bar}>
              <div className={styles.innerBar}></div>
            </div>
          </div>
        </section>
        <section className={styles.userReviews}>
          <div className={styles.options}>
            <span
              className={`${
                activeOption === 'REVIEWS'
                  ? styles.activeOption
                  : styles.inactiveOption
              }`}
              onClick={() => {
                setActiveOption('REVIEWS');
              }}
            >
              Reviews
              <p className={styles.optionActionCount}>1</p>
            </span>
            <span
              className={`${
                activeOption === 'QUESTIONS'
                  ? styles.activeOption
                  : styles.inactiveOption
              }`}
              onClick={() => {
                setActiveOption('QUESTIONS');
              }}
            >
              Questions
              <p className={styles.optionActionCount}>1</p>
            </span>
          </div>
          {activeOption === 'REVIEWS' ? (
            <ul className={styles.reviewsList}>
              <li className={styles.userReview}>
                <div className={styles.userReviewHeader}>
                  <h2 className={styles.userName}>Gabbe</h2>
                  <p className={styles.reviewDate}>
                    {new Date().toDateString()}
                  </p>
                </div>
                <div className={styles.userStars}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                  <h2 className={styles.userTitleReview}>AMAZING</h2>
                </div>
                <p className={styles.userTextReview}>really nice</p>
              </li>
            </ul>
          ) : (
            <ul className={styles.reviewsList}>
              <li className={styles.userReview}>
                <div className={styles.userReviewHeader}>
                  <h2 className={styles.userName}>Gabbe</h2>
                  <p className={styles.reviewDate}>
                    {new Date().toDateString()}
                  </p>
                </div>

                <p className={styles.userTextReview}>really nice</p>
                <div className={styles.answerWrapper}>
                  <span className={styles.answerHeader}>
                    <h1>Swedish Delicacies</h1>
                    <p>{new Date().toDateString()}</p>
                  </span>
                  <p className={styles.answer}>Thank you!</p>
                </div>
              </li>
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Reviews;