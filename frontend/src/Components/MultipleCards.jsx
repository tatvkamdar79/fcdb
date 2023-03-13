import React from 'react'
import { Card } from './Card'

export const MultipleCards = ({ id, ServiceName, ImageLink, RedirectLink,Description}) => {
  return (
    <div>
      <div class="container my-12 mx-auto px-4 md:px-12">
          <div class="flex flex-wrap -mx-1 lg:-mx-4">
              <Card id={1} ServiceName={"Web Development"} ImageLink={"https://www.analyticsinsight.net/wp-content/uploads/2020/11/Artificial-Intelligence-5.jpg"} RedirectLink = {"/"} Description={"To explore this service please join us!"} />
              <Card id={1} ServiceName={"Web Development"} ImageLink={"https://www.analyticsinsight.net/wp-content/uploads/2020/11/Artificial-Intelligence-5.jpg"} RedirectLink = {"/"} Description={"To explore this service please join us!"} />
              <Card id={1} ServiceName={"Web Development"} ImageLink={"https://www.analyticsinsight.net/wp-content/uploads/2020/11/Artificial-Intelligence-5.jpg"} RedirectLink = {"/"} Description={"To explore this service please join us!"} />
              <Card id={1} ServiceName={"Web Development"} ImageLink={"https://www.analyticsinsight.net/wp-content/uploads/2020/11/Artificial-Intelligence-5.jpg"} RedirectLink = {"/"} Description={"To explore this service please join us!"} />
                
          </div>
      </div>
    </div>
  )
}
