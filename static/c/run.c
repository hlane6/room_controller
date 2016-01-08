#include <alsa/asoundlib.h>

int main() {
    int rc;
    snd_pcm_t *handle;
    snd_pcm_hw_params_t *params;
    unsigned int val, val2;
    int dir;
    snd_pcm_uframes_t frames;

    rc = snd_pcm_open(&handle, "default",
            SND_PCM_STREAM_PLAYBACK, 0);

    if (rc < 0) {
        printf("Unable to open pcm device: %s\n", snd_strerror(rc));
        exit(0);
    }

    snd_pcm_close(handle);

    return 0;
}
