<template>
        <div id="dashboard-andamento">
              <div class="dashcursos">
                <div class="owl-arrows flex-container flex-nowrap">
                    <div class="flex-item">
                      <h5>Meus cursos em progresso</h5>
                    </div>
                    <div class="flex-container arrows flex-nowrap">
                      <div class="arrow arrow-left swiper-cursos-andamento-arrow-prev">
                          <i class="fa fa-angle-left"></i>
                      </div>
                      <div class="arrow arrow-right swiper-cursos-andamento-arrow-next">
                          <i class="fa fa-angle-right"></i>
                      </div>
                    </div>
                </div>
                <br>
                  <div style="position: relative;">
                    <Swiper
                    pagination={{
                      dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    class="swiper-andamento"
                        on:slideChange={() => console.log('slide change')}
                        on:swiper={(e) => console.log(e.detail[0])}
                        >
                        <SwiperSlide>
                            <SlideAndamento />
                        </SwiperSlide>
                        <SwiperSlide>
                            <SlideAndamento />
                        </SwiperSlide>
                        <SwiperSlide>
                            <SlideAndamento />
                        </SwiperSlide>
                        <SwiperSlide>
                            <SlideAndamento />
                        </SwiperSlide>
                        <SwiperSlide>
                            <SlideAndamento />
                        </SwiperSlide>
                    </Swiper>
                </div>
              </div>
        </div>
</template>

<script>
export default {
  name: 'DashboardAndamento',
};
</script>
